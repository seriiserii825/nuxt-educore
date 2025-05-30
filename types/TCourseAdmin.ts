export type TCourseAdmin = {
  id: number;
  instructor_id: number;
  category_id: null;
  course_type: string;
  title: string;
  slug: string;
  seo_description: string;
  duration: null;
  timezone: null;
  thumbnail: string;
  demo_video_storage: 'upload' | 'youtube' | 'vimeo' | 'external_link';
  demo_video_source: string;
  description: null;
  capacity: null;
  price: number;
  discount: number;
  certificate: number;
  qna: number;
  message_for_review: null;
  is_approved: string;
  status: string;
  course_level_id: null;
  course_language_id: null;
  created_at: string;
  updated_at: string;
  instructor: {
    id: number;
    name: string;
  }
};
