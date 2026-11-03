# Personal photo collection

Original JPEGs were moved from the repository root to `full/` byte for byte, without re-encoding, resizing, or altering metadata. SHA-256 hashes, source filenames and display dimensions are recorded in manifest.json. Separate 720px JPEG previews in `thumbs/` are used only for gallery tiles. The viewer loads the original JPEG on demand. No exact duplicates were found among the seven new originals. Previous compressed gallery versions are removed from the deployed assets and retained locally under ignored `.local-artifacts/replaced-gallery/`.
