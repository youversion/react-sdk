import { useState, useCallback } from "react";
import { BibleVersionLanguageFilter } from "./BibleVersionLangaugeFilter";
import { useReaderContext } from "../../../context";
import { useVersions } from "../../../hooks";
import { Version } from "@youversion/bible-core";
import { ModalHeader, SearchBar, SlideInModal } from "../../../shared";
import { VersionSelectionList } from "..";
import { useFilteredVersions } from "../../../hooks/useFilteredVersions";
import { LANGUAGES } from "../../../shared/constants";

interface Props {
  onSelect: (selection: Version) => void;
  modalPlacement?: "top" | "bottom";
  screenEdgeGap?: number;
  isOpen: boolean;
  onClose: () => void;
  remainOpenOnSelect?: boolean;
  languages?: string[];
}

const DEFAULT_SCREEN_EDGE_GAP = 100;
const DEFAULT_DEBOUNCE_TIME = 50;

function VersionLoadingState() {
  return <div className="p-4">Loading versions...</div>;
}

export function BibleVersionSelectionModal({
  modalPlacement = "bottom",
  screenEdgeGap = DEFAULT_SCREEN_EDGE_GAP,
  isOpen,
  onSelect,
  onClose,
  remainOpenOnSelect = false,
  languages,
}: Props) {
  const [versionSearch, setVersionSearch] = useState("");
  const defaultLanguage = LANGUAGES.find(
    (l) => l.iso === navigator.language.split("-")[0]
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    defaultLanguage?.iso || "*"
  );
  const { currentVersion } = useReaderContext();
  const { versions, loading: isLoading } = useVersions("*");

  const filteredVersions = useFilteredVersions(
    versions?.data || [],
    versionSearch,
    selectedLanguage
  );

  const handleVersionSelect = useCallback(
    (version: Version) => {
      onSelect(version);
      if (!remainOpenOnSelect) {
        onClose();
      }
    },
    [onSelect, onClose, remainOpenOnSelect]
  );

  const handleSearchChange = useCallback((searchValue: string) => {
    setVersionSearch(searchValue);
  }, []);

  return (
    <SlideInModal
      isOpen={isOpen}
      onClose={onClose}
      position={modalPlacement}
      distance={screenEdgeGap}
      backdrop
      closeOnClickOutside
      className="w-screen sm:w-[500px] sm:rounded-lg"
    >
      <ModalHeader title="Bible Versions" onCloseClicked={onClose}>
        <div className="space-y-2 w-full">
          <SearchBar
            onChange={handleSearchChange}
            debounceTime={DEFAULT_DEBOUNCE_TIME}
            placeholder="Search versions..."
          />
          {(!languages || languages.length === 0) && (
            <BibleVersionLanguageFilter
              selectedLanguage={selectedLanguage}
              onLanguageChange={(lang) => {
                setSelectedLanguage(lang);
                setVersionSearch("");
              }}
              className="w-full"
            />
          )}
        </div>
      </ModalHeader>

      {isLoading ? (
        <VersionLoadingState />
      ) : (
        <VersionSelectionList
          className="px-4 mt-2"
          versions={filteredVersions}
          currentVersionId={currentVersion.id}
          onSelect={handleVersionSelect}
        />
      )}
    </SlideInModal>
  );
}
