import type {TLesson} from "./TLesson";

export type TCourseChapter = {
  id: number;
  title: string;
  course_id: number;
  instructor_id: number;
  order: number;
  status: number;
  created_at: string;
  updated_at: string;
  lessons?: TLesson[]
}
