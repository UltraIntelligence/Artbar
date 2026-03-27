import { defaultContent } from '@/data/content';
import { TeamBuilding } from '@/views/TeamBuilding';

export const metadata = {
  title: defaultContent.en.teamBuilding.hero.title,
  description: defaultContent.en.teamBuilding.hero.subtitle,
  alternates: { canonical: '/team-building' },
};

export default function TeamBuildingPage() {
  return <TeamBuilding />;
}
