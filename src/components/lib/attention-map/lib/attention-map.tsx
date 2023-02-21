import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

import Chart from '../../chart';
import { BACKEND_URL } from '../../../../utils';

interface AttentionScoresType {
    toTokenId: number,
    value: number,
    isMin?: boolean;
    isMax?: boolean;
}

interface TokenType {
    id: number;
    word: string;
}

interface LinkType {
    from: number;
    to: number;
    weight: number;
    visible: boolean;
}

const CELL_HEIGHT = 40;
const CELL_WIDTH = 150;
const TO_TOKEN_X_POSITION = 300;
const FROM_TOKEN_X_POSITION = 10;
const CELL_PADDING = 10;
const STROKE_COLOR = 'cornflowerblue';
const BORDER_COLOR = 'black';
const ATTENTION_SCORE_POSITION = TO_TOKEN_X_POSITION + CELL_WIDTH;

const FilterContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
`;

interface AttentionMapProps {
  layer: number | string;
  head: number | string;
  id: string;
  model: string;
}

export const AttentionMap = ({ layer, head, id, model }: AttentionMapProps) => {
  const [attentionScores, setAttentionScores] = useState<AttentionScoresType[]>([]);
  const [from, setFrom] = useState<TokenType[]>([]);
  const [to, setTo] = useState<TokenType[]>([]);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [minIndex, setMinIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
        const URL = `${BACKEND_URL}/attention-score?layerNumber=${layer}&headNumber=${head}&instance=${id}&model=${model}`;
        try {
          setLoading(true);

          const response = await axios(URL);
          if (response.data === '') throw new Error('Empty response');

          setFrom(response.data.from);
          setTo(response.data.to);
          setLinks(response.data.links);
        } catch (error) {
          setLoading(false);
          setLoadError(true);
        }
    }
    fetchData();
  }, [head, id, layer, model]);

  useEffect(() => {
    if (from.length > 0) {
        setLoading(false);
    }
  }, [from]);

  // TODO: OPTTIMIZE IF NEEDED
  const handleTokenMouseOver = (currentTokenId: number) => {
    setLinks((prevLinks) => prevLinks.map((link: LinkType) => {
      if (link.from !== currentTokenId) {
        return {
          ...link,
          visible: false,
        };
      }

      return link;
    }));

    setAttentionScores(() => {
      const newLinks = links.reduce((currentAggregate, currentLink) => {
        const aggregateLinkData = currentAggregate;

        if (currentLink.from === currentTokenId) {
          if (aggregateLinkData.currentMax && aggregateLinkData.currentMin) {
            if (aggregateLinkData.currentMax.value <= currentLink.weight) {
              aggregateLinkData.currentMax = {
                index: aggregateLinkData.currentLinks.length,
                value: currentLink.weight,
              };
            }
            if (aggregateLinkData.currentMin.value >= currentLink.weight) {
              aggregateLinkData.currentMin = {
                index: aggregateLinkData.currentLinks.length,
                value: currentLink.weight,
              };
            }
          } else {
            aggregateLinkData.currentMax = {
              index: aggregateLinkData.currentLinks.length,
              value: currentLink.weight,
            };
            aggregateLinkData.currentMin = {
              index: aggregateLinkData.currentLinks.length,
              value: currentLink.weight,
            };
          }

          return {
            ...aggregateLinkData,
            currentLinks: [
              ...aggregateLinkData.currentLinks,
              {
                  toTokenId: currentLink.to,
                  value: currentLink.weight,
              },
            ],
          };
        }
        return aggregateLinkData;
      }, {
        currentLinks: [],
        currentMax: undefined,
        currentMin: undefined,
      } as {
        currentLinks: AttentionScoresType[],
        currentMax: { index: number, value: number } | undefined,
        currentMin: { index: number, value: number } | undefined,
      });
      if (newLinks.currentMax && newLinks.currentMin) {
        setMaxIndex(newLinks.currentMax?.index);
        setMinIndex(newLinks.currentMin?.index);
      }
      return newLinks.currentLinks;
    });
  };

  const handleTokenMouseOut = () => {
    setLinks((prevLinks) => prevLinks.map((link) => ({
      ...link,
      visible: true,
    })));
    setAttentionScores([]);
  };

  const renderFromTokens = () => from.map((fromToken) => (
    <g>
      <rect
        width={CELL_WIDTH}
        height={CELL_HEIGHT}
        fill="white"
        stroke={BORDER_COLOR}
        x={FROM_TOKEN_X_POSITION}
        y={fromToken.id * CELL_HEIGHT}
        onMouseEnter={() => handleTokenMouseOver(fromToken.id)}
        onMouseLeave={() => handleTokenMouseOut()}
      />
      <text
        x={FROM_TOKEN_X_POSITION + CELL_PADDING}
        y={fromToken.id * CELL_HEIGHT + (CELL_HEIGHT / 1.5)}
      >
        {fromToken.word}
      </text>
    </g>
  ));

  const renderToTokens = () => to.map((toToken) => (
    <g>
      <rect
        width={CELL_WIDTH}
        height={CELL_HEIGHT}
        fill="white"
        stroke={BORDER_COLOR}
        x={TO_TOKEN_X_POSITION}
        y={toToken.id * CELL_HEIGHT}
      />
      <text
        x={TO_TOKEN_X_POSITION + CELL_PADDING}
        y={toToken.id * CELL_HEIGHT + (CELL_HEIGHT / 1.5)}
      >
        {toToken.word}
      </text>
    </g>
  ));

  const getFillBasedOnIndex = (index: number) => {
    if (index === minIndex) {
      return '#FA8072';
    }
    if (index === maxIndex) {
      return '#7FFFD4';
    }
    return 'grey';
  };

  const renderAttentionScores = () => attentionScores.map((score, index) => {
    console.log(maxIndex);
    console.log(minIndex);
    return (
      <g>
        <rect
          width={50}
          height={CELL_HEIGHT}
          fill={getFillBasedOnIndex(index)}
          stroke={BORDER_COLOR}
          x={ATTENTION_SCORE_POSITION}
          y={score.toTokenId * CELL_HEIGHT}
        />
        <text
          x={ATTENTION_SCORE_POSITION + CELL_PADDING}
          y={score.toTokenId * CELL_HEIGHT + (CELL_HEIGHT / 1.5)}
        >
          {score.value}
        </text>
      </g>
    )
  });

  const renderLinks = () => links.map((link) => (
    link.visible
    && (
    <line
      x1={CELL_WIDTH + CELL_PADDING}
      x2={TO_TOKEN_X_POSITION}
      y1={link.from * CELL_HEIGHT + (CELL_HEIGHT / 2)}
      y2={link.to * CELL_HEIGHT + (CELL_HEIGHT / 2)}
      stroke={STROKE_COLOR}
      strokeWidth={link.weight}
    />
    )
  ));

  return (
    <>
      {(!loading && loadError) && <p>Failed to load attention map</p>}
      {(loading && !loadError) && <CircularProgress />}
      {
        (!loading && !loadError)
        && (
          <Chart
            dimensions={{
                    width: 600,
                    height: from.length * 50,
                    margin: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                    },
                }}
          >
            {renderLinks()}
            {renderFromTokens()}
            {renderToTokens()}
            {attentionScores.length > 0 && renderAttentionScores()}
          </Chart>
        )
    }
    </>
  );
};

export default AttentionMap;
