import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Verse } from "@youversion/bible-core";
import { useVerseSelection } from "@youversion/bible-hooks";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { bibleTextStyles } from "../reader/styles";

interface SelectableVerseProps {
  verse: Verse;
}
export function SelectableVerse({ verse }: SelectableVerseProps) {
  const { toggleVerse, isSelected, selectedCount } = useVerseSelection();
  const { width } = useWindowDimensions();

  const isCurrentVerseSelected = isSelected(verse.usfm);
  const shouldDim = selectedCount > 0 && !isCurrentVerseSelected;

  const containerStyle = [
    styles.container,
    isCurrentVerseSelected && [styles.selected],
    shouldDim && styles.dimmed,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => toggleVerse(verse.usfm)}
      testID={verse.usfm}
    >
      <RenderHtml
        contentWidth={width}
        source={{ html: `<div class="verse">${verse.content}</div>` }}
        tagsStyles={bibleTextStyles}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
  },
  dimmed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  selectedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: "#9CA3AF",
  },
});
