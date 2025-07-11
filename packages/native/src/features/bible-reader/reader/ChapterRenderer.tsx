import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useReaderContext, useVerses } from "@youversion/bible-hooks";
import { SelectableVerse } from "../verse-selection/SelectableVerse";

export function ChapterRenderer() {
  const { currentVersion, currentBook, currentChapter } = useReaderContext();

  const { verses, loading, error } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title)
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingHeader}>
            <View style={styles.loadingTitle} />
            <View style={styles.loadingChapter} />
          </View>
          <ActivityIndicator
            size="large"
            color="#636161"
            style={styles.spinner}
          />
          <View style={styles.loadingVerses}>
            {[...Array(8)].map((_, i) => (
              <View key={i} style={styles.loadingVerse}>
                <View style={styles.loadingLine} />
                <View style={[styles.loadingLine, styles.loadingLineShort]} />
                <View style={[styles.loadingLine, styles.loadingLineMedium]} />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading verses: {error.message}
        </Text>
      </View>
    );
  }

  if (!verses?.data || verses.data.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.emptyText}>No verses found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.bookTitle}>{currentBook.title}</Text>
        <Text style={styles.chapterTitle}>{currentChapter.title}</Text>
      </View>
      {verses.data.map((verse) => (
        <SelectableVerse key={verse.usfm} verse={verse} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    maxWidth: 512,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    maxWidth: 512,
    width: "100%",
    paddingHorizontal: 24,
  },
  loadingHeader: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 16,
  },
  loadingTitle: {
    height: 32,
    width: 96,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 16,
  },
  loadingChapter: {
    height: 48,
    width: 48,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 24,
  },
  loadingVerses: {
    gap: 16,
  },
  loadingVerse: {
    gap: 8,
  },
  loadingLine: {
    height: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  loadingLineShort: {
    width: "75%",
  },
  loadingLineMedium: {
    width: "85%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 24,
  },
  bookTitle: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    color: "#636161",
    fontFamily: "Untitled_Serif",
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 48,
    lineHeight: 60,
    textAlign: "center",
    color: "#636161",
    fontFamily: "Untitled_Serif",
    marginBottom: 24,
  },
});
