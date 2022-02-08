import MarketResearchSignup from '@/components/MarketResearchSignup';
import { ReactElement } from 'react';
import SHORTCODES from '@/constants/shortcodes';

export function renderShortcode(shortcode: string): ReactElement | null {
  if (SHORTCODES.MARKET_RESEARCH_SIGNUP.test(shortcode)) {
    return <MarketResearchSignup />;
  }

  return null;
}
