import { defaultContent } from '@/data/content';
import { BlogList } from '@/views/BlogList';

export const metadata = {
  title: defaultContent.en.blogPage.title,
  description: defaultContent.en.blogPage.subtitle,
};

export default function BlogPage() {
  return <BlogList />;
}
