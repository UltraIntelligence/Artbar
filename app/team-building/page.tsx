import { defaultContent } from '@/data/content';
import { TeamBuilding } from '@/views/TeamBuilding';

export const metadata = {
  title: defaultContent.en.teamBuilding.hero.title,
};

export default function TeamBuildingPage() {
  return <TeamBuilding />;
}
