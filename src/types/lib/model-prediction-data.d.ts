import { Prediction, PredictionOutcome } from '../../utils';

export interface InstanceDataGridRow {
    id: number;
    premise: string;
    hypothesis: string;
    prediction: Prediction;
    confidence: number;
    result: PredictionOutcome;
    groupId: number;
    isAdversarial: boolean;
}
