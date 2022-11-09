import { IAnswer } from "./Answer";

export interface IQuestion {
  id: number;
  question: string;
  chooses: IAnswer[];
  courseId:number;
}
