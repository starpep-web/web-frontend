export const ATOM_STYLES = ['line', 'cross', 'stick', 'sphere', 'cartoon', 'clicksphere'] as const;
export type AtomStyle = typeof ATOM_STYLES[number];

export const COLOR_SCHEMES = [
  'ssPyMol', 'ssJmol', 'Jmol', 'amino', 'shapely', 'nucleic',
  'chain', 'rasmol', 'default', 'greenCarbon', 'cyanCarbon', 'magentaCarbon',
  'purpleCarbon', 'whiteCarbon', 'orangeCarbon', 'yellowCarbon', 'blueCarbon', 'chainHetatm'
] as const;
export type ColorScheme = typeof COLOR_SCHEMES[number];
