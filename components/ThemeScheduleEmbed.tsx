"use client";

import React from "react";
import { getArtbarThemeScheduleEmbedUrl } from "../constants";
import { PaintaScheduleEmbed } from "./PaintaScheduleEmbed";

interface ThemeScheduleEmbedProps {
  themeSlug: string;
  locale: "en" | "ja";
  title: string;
}

export const ThemeScheduleEmbed: React.FC<ThemeScheduleEmbedProps> = ({
  themeSlug,
  locale,
  title,
}) => {
  const src = getArtbarThemeScheduleEmbedUrl(themeSlug, locale);
  return <PaintaScheduleEmbed src={src} title={title} />;
};
