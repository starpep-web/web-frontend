import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faSearch, faDatabase, faAtom, faStarOfLife, faBullseye,
  faC, faN, faLinkSlash, faFileLines, faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faFilter, faPalette, faShapes, faRotate, faExpand, faCompress
} from '@fortawesome/free-solid-svg-icons';

const { config, library } = require('@fortawesome/fontawesome-svg-core');

config.autoAddCss = false;

// @fortawesome/free-solid-svg-icons
library.add(
  faSearch, faDatabase, faAtom, faStarOfLife, faBullseye,
  faC, faN, faLinkSlash, faFileLines, faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faFilter, faPalette, faShapes, faRotate, faExpand, faCompress
);
