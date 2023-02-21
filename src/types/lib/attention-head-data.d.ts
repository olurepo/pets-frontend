import { SyntacticRelation } from '../../utils';

export interface AttentionHead {
    id: number;
    accuracy: number;
    syntacticRelationship: string;
}

export interface AttentionDataGridRow {
    id: number;
    layer: number;
    heads: AttentionHead[]
}
