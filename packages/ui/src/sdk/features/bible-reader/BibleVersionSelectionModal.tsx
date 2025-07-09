import { useEffect, useMemo, useState } from "react";
import { useReaderContext } from "../../context";
import { useVersions } from "../../hooks";
import { Version } from "@youversion/bible-core";
import { ModalHeader, SearchBar, SlideInModal } from "../../shared";
import { VersionSelectionList } from ".";

export type VersionOption = {
  id: number;
  name: string;
  abbreviation: string;
  language: string;
};

interface Props {
  onSelect: (selection: Version) => void;
  modalPlacement?: "top" | "bottom";
  screenEdgeGap?: number;
  isOpen: boolean;
  onClose: () => void;
  remainOpenOnSelect?: boolean;
}

export function BibleVersionSelectionModal({
  modalPlacement,
  screenEdgeGap,
  isOpen,
  onSelect,
  onClose,
  remainOpenOnSelect,
}: Props) {
  const [filteredVersions, setFilteredVersions] = useState<Array<VersionOption>>([]);
  const [versionSearch, setVersionSearch] = useState("");

  const { currentVersion } = useReaderContext();
  const { versions, loading: loadingVersions } = useVersions();

  const versionOptions: VersionOption[] = useMemo(() => {
    if (!versions?.data) return [];
    return versions.data.map((v) => ({
      id: v.id,
      name: v.title,
      abbreviation: v.abbreviation,
      language: v.language.name,
    }));
  }, [versions]);

  useEffect(() => {
    if ((versionOptions && versionSearch === "") || versionSearch == null) {
      setFilteredVersions(versionOptions);
      return;
    }
    setFilteredVersions(
      versionOptions.filter((v: VersionOption) =>
        v.name.toLowerCase().includes(versionSearch.toLowerCase()) ||
        v.abbreviation.toLowerCase().includes(versionSearch.toLowerCase()) ||
        v.language.toLowerCase().includes(versionSearch.toLowerCase())
      )
    );
  }, [versionSearch, versionOptions]);

  function onVersionSelected(version: Version) {
    onSelect(version);

    if (!remainOpenOnSelect) {
      onClose();
    }
  }

  return (
    <SlideInModal
      isOpen={isOpen}
      onClose={onClose}
      position={modalPlacement ?? "bottom"}
      distance={screenEdgeGap ?? 100}
      backdrop={true}
      closeOnClickOutside={true}
      className="w-screen sm:w-[500px] sm:rounded-lg"
    >
      <ModalHeader title="Bible Versions" onCloseClicked={onClose}>
        <SearchBar onChange={(v) => setVersionSearch(v)} debounceTime={50} />
      </ModalHeader>
      {!loadingVersions ? (
        <VersionSelectionList
          className="px-4 mt-2"
          versions={filteredVersions}
          currentVersionId={currentVersion.id}
          onSelect={onVersionSelected}
        />
      ) : (
        <div className="p-4">Loading versions...</div>
      )}
    </SlideInModal>
  );
}