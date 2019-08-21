import { NodeData } from './NodeData';

export interface ArticleData extends NodeData {
    version: number;
    creationTime: string;
    updateTime: string;
}
