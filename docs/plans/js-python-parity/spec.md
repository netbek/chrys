# JavaScript and Python Parity Specification

> **Status:** Draft. Last updated 2026-11-06.

## Purpose

The JavaScript and Python packages ship the same palette collection but expose different behavior for contrast selection, continuous palettes, RGB output, catalog exports, and input validation. This specification defines one cross-language contract so that the same palette name, size, colors, and options produce the same observable result in either package. It covers the runtime APIs and the generated palette artifacts, and it makes APCA the shared default contrast algorithm.

## Requirements

### Requirement: Palette data parity

Both packages SHALL ship identical discrete palette data, documentation palette data, and continuous source data, including palette names, supported sizes, and colors.

#### Scenario: Same discrete palette and size

- **WHEN** the same palette name and discrete size are requested from either package
- **THEN** both packages return the same ordered list of hexadecimal colors
- **AND** the returned list has exactly the requested number of colors unless clamping applies

#### Scenario: Same documentation palette

- **WHEN** the same palette name is requested as a documentation palette from either package
- **THEN** both packages return the same ordered list of hexadecimal colors
- **AND** the returned list is a copy that does not mutate shared data

#### Scenario: Same continuous source palette

- **WHEN** a continuous-capable palette is inspected in either package
- **THEN** both expose the same 256-color source list
- **AND** the source lists contain identical hexadecimal colors in identical order

#### Scenario: Data parity across regenerated artifacts

- **WHEN** the palette data generation step runs
- **THEN** it produces JavaScript and Python artifacts with identical palette entries
- **AND** a full comparison of every name, size, and color reports no differences

### Requirement: Palette catalog export parity

Both packages SHALL expose complete per-vendor catalog information from their public palette APIs, including constant-to-name maps, palette maps, documentation maps, palette groups, and continuous-palette name lists.

#### Scenario: D3 catalog available from the public palette API

- **WHEN** a caller reads the D3 name map, palette map, or documentation map from the public palette API
- **THEN** both packages provide the complete D3 catalog
- **AND** every D3 constant maps to the same palette name as in the other package

#### Scenario: Group membership matches

- **WHEN** a caller compares categorical, diverging, sequential, and cyclical group membership between the packages
- **THEN** each group contains the same palette names for each vendor
- **AND** the vendor assignment for every catalog name is identical

#### Scenario: Continuous name lists match

- **WHEN** a caller reads the list of continuous-capable palettes for a vendor
- **THEN** both packages report the same names in the same order
- **AND** every reported name resolves to a palette with a 256-color source

### Requirement: Package-root API parity

Both package roots SHALL expose the public palette operations, contrast operations, and catalog constants.

#### Scenario: Public operation available from the package root

- **WHEN** a caller imports a public palette or contrast operation from the package root in either language
- **THEN** the import succeeds without requiring a submodule import
- **AND** the operation behaves the same as when imported from its language-specific submodule

#### Scenario: Catalog constants available from the package root

- **WHEN** a caller imports a vendor name map or palette map from the package root
- **THEN** both packages expose the requested map
- **AND** the map contains the same entries as the other package

### Requirement: Discrete palette size selection

Both packages SHALL return a discrete palette of the requested size using the same clamping and exact-size rules.

#### Scenario: Requested size below the smallest supported size

- **WHEN** the requested size is smaller than the smallest supported size for a palette
- **THEN** both packages return the leading colors from the smallest supported palette
- **AND** the number of returned colors equals the requested size

#### Scenario: Requested size above the largest supported size

- **WHEN** the requested size is larger than the largest supported size for a palette
- **THEN** both packages return the colors from the largest supported palette
- **AND** the number of returned colors equals the largest supported size

#### Scenario: Requested size exactly supported

- **WHEN** the requested size exists as a discrete size for a palette
- **THEN** both packages return that palette entry
- **AND** the returned list is a copy that does not mutate shared data

#### Scenario: Zero colors requested

- **WHEN** the requested size is zero
- **THEN** both packages return an empty list
- **AND** neither package validates the palette contents first

### Requirement: Discrete palette input validation

Both packages SHALL reject invalid discrete palette sizes, unsupported intermediate sizes, and empty palettes.

#### Scenario: Negative size

- **WHEN** the requested size is negative
- **THEN** both packages raise an error
- **AND** the error uses the size-validation wording in the design error reference

#### Scenario: Non-integer size

- **WHEN** the requested size is not an integer
- **THEN** both packages raise an error
- **AND** neither package truncates or rounds the requested size

#### Scenario: Unsupported intermediate size

- **WHEN** the requested size falls between two non-contiguous supported sizes
- **THEN** both packages raise an error
- **AND** the error lists all supported sizes in ascending order

#### Scenario: Empty palette

- **WHEN** a discrete conversion receives a palette with no sizes
- **THEN** both packages raise an error
- **AND** the error uses the empty-palette wording in the design error reference

### Requirement: Continuous palette availability

Both packages SHALL expose named continuous-palette lookup and continuous-palette conversion for every catalog palette with a 256-color source.

#### Scenario: Supported continuous palette

- **WHEN** a caller requests a continuous palette for a name with a 256-color source
- **THEN** both packages return a sampled color list of the requested size
- **AND** both packages use the same source list

#### Scenario: Unsupported continuous palette

- **WHEN** a caller requests a continuous palette for a name without a 256-color source
- **THEN** both packages raise an error
- **AND** the error uses the unsupported-continuous wording in the design error reference

### Requirement: Continuous palette sizing

Both packages SHALL apply the same size rules to continuous-palette conversion.

#### Scenario: Zero colors requested

- **WHEN** zero continuous colors are requested
- **THEN** both packages return an empty list
- **AND** neither package requires the source palette to be non-empty

#### Scenario: One color requested

- **WHEN** one continuous color is requested
- **THEN** both packages return the first color from the source palette
- **AND** the result is a single-element list

#### Scenario: Count equal to source length

- **WHEN** the requested count equals the number of colors in the source palette
- **THEN** both packages return every source color in source order
- **AND** the result contains no duplicates introduced by sampling

#### Scenario: Count greater than source length

- **WHEN** the requested count exceeds the number of colors in the source palette
- **THEN** both packages raise an error
- **AND** the error uses the too-many-colors wording in the design error reference

### Requirement: Continuous quantile sampling

Both packages SHALL use quantile sampling, as defined in the design, when selecting colors from a continuous source palette.

#### Scenario: Three colors from a four-color source

- **WHEN** three colors are requested from a four-color source
- **THEN** both packages return the first, third, and fourth source colors
- **AND** the results are identical across packages

#### Scenario: Two colors from a four-color source

- **WHEN** two colors are requested from a four-color source
- **THEN** both packages return the first and last source colors
- **AND** the results are identical across packages

#### Scenario: Quantile sample is deterministic

- **WHEN** the same source palette and requested count are sampled more than once
- **THEN** both packages return the same color list on every call
- **AND** no random or platform-dependent selection occurs

### Requirement: RGB output

Both packages SHALL support an RGB-output mode for discrete, continuous, and documentation palette operations.

#### Scenario: RGB output enabled

- **WHEN** RGB output is enabled for a palette operation
- **THEN** both packages return three-component sequences of integers from 0 to 255
- **AND** each component represents the red, green, and blue channel of the corresponding hex color

#### Scenario: RGB output disabled

- **WHEN** RGB output is not enabled for a palette operation
- **THEN** both packages return hexadecimal color strings
- **AND** the output matches the default behavior of the other package

#### Scenario: Shared data remains unchanged

- **WHEN** a caller mutates an RGB result or a hex result
- **THEN** subsequent calls return the original palette colors
- **AND** the shared palette data is not modified

### Requirement: Contrast algorithm default

Both packages SHALL default to the APCA algorithm when no contrast algorithm is specified.

#### Scenario: Default on red background

- **WHEN** black and white are evaluated against a red background with no options
- **THEN** both packages select white
- **AND** the selected color is the one with the higher absolute APCA score

#### Scenario: Default is not WCAG

- **WHEN** black and white are evaluated against a mid-grey background with no options
- **THEN** both packages select the same color as the APCA algorithm
- **AND** the result is not required to match the WCAG result

### Requirement: Contrast algorithm selection

Both packages SHALL accept a shared options object that selects APCA or WCAG.

#### Scenario: Explicit APCA selection

- **WHEN** the options object selects APCA
- **THEN** both packages return the same color as the default APCA behavior
- **AND** the large-text and AAA options do not change the APCA score

#### Scenario: Explicit WCAG selection

- **WHEN** the options object selects WCAG
- **THEN** both packages return the same color as the WCAG algorithm
- **AND** black and white on a red background select black

#### Scenario: Unrecognized algorithm

- **WHEN** the options object selects an algorithm other than APCA or WCAG
- **THEN** both packages raise an error
- **AND** neither package silently falls back to another algorithm

### Requirement: Contrast scoring parity

Both packages SHALL expose a contrast scoring operation that returns the same numeric score for the same background color, foreground color, and options.

#### Scenario: WCAG score without an accessibility bonus

- **WHEN** black text on white is scored with WCAG, normal text, and no AAA requirement
- **THEN** both packages return a score of 121.0
- **AND** the score equals the contrast ratio plus the applicable threshold bonus

#### Scenario: WCAG score with a large-text bonus

- **WHEN** white text on `#777777` is scored with WCAG and large text
- **THEN** both packages return a score of approximately 104.478089
- **AND** the score equals the contrast ratio plus the large-text threshold bonus

#### Scenario: WCAG score without a failed bonus

- **WHEN** `#777777` text on white is scored with WCAG and an AAA requirement
- **THEN** both packages return a score of approximately 4.478089
- **AND** no AAA bonus is added when the candidate fails the AAA threshold

#### Scenario: APCA score ignores accessibility flags

- **WHEN** the same colors are scored with APCA while changing the large-text and AAA options
- **THEN** both packages return the same APCA score for every option combination
- **AND** the APCA score is the absolute APCA contrast value

### Requirement: Contrast candidate selection

Both packages SHALL select the foreground candidate with the highest contrast score.

#### Scenario: Highest score wins

- **WHEN** a background and multiple foreground candidates are evaluated
- **THEN** both packages return the candidate with the highest score
- **AND** the returned value is the original candidate color, not a normalized form

#### Scenario: Tie returns the first candidate

- **WHEN** two or more candidates have the same highest score
- **THEN** both packages return the candidate that appears first in the input order
- **AND** input order is preserved

#### Scenario: Empty candidate list

- **WHEN** the foreground candidate list is empty
- **THEN** both packages raise an error
- **AND** neither package returns an empty value or an undefined value

### Requirement: Contrast input validation

Both packages SHALL reject invalid colors and invalid contrast options with an error.

#### Scenario: Invalid background color

- **WHEN** the background color cannot be parsed
- **THEN** both packages raise an error
- **AND** neither package returns a candidate color

#### Scenario: Invalid foreground color

- **WHEN** any foreground candidate cannot be parsed
- **THEN** both packages raise an error
- **AND** neither package silently ignores the invalid candidate

#### Scenario: Invalid options object

- **WHEN** the options object contains an unsupported field or an invalid value
- **THEN** both packages raise an error
- **AND** neither package silently ignores the invalid option

### Requirement: Palette name and data errors

Both packages SHALL reject unrecognized palette names and missing palette data with the same message wording.

#### Scenario: Unrecognized palette name

- **WHEN** a palette operation receives a name that is not in the catalog
- **THEN** both packages raise an error
- **AND** the error uses the unknown-palette wording in the design error reference

#### Scenario: Missing discrete palette data

- **WHEN** a recognized palette name has no discrete data in the catalog
- **THEN** both packages raise an error
- **AND** the error uses the missing-palette-data wording in the design error reference

#### Scenario: Missing documentation palette data

- **WHEN** a recognized palette name has no documentation data in the catalog
- **THEN** both packages raise an error
- **AND** the error uses the missing-documentation wording in the design error reference
