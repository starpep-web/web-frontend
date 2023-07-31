import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faSearch, faDatabase, faAtom, faStarOfLife, faBullseye,
  faC, faN, faLinkSlash, faFileLines, faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faFilter, faPalette, faShapes, faRotate, faExpand, faCompress, faClipboard,
  faHome, faTriangleExclamation, faQuestionCircle, faPlus, faX, faUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook, faInstagram, faLinkedin, faTwitter
} from '@fortawesome/free-brands-svg-icons';

const { config, library } = require('@fortawesome/fontawesome-svg-core');

config.autoAddCss = false;

// @fortawesome/free-solid-svg-icons
library.add(
  faSearch, faDatabase, faAtom, faStarOfLife, faBullseye,
  faC, faN, faLinkSlash, faFileLines, faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faFilter, faPalette, faShapes, faRotate, faExpand, faCompress, faClipboard,
  faHome, faTriangleExclamation, faQuestionCircle, faPlus, faX, faUpRightFromSquare
);

// @fortawesome/free-brands-svg-icons
library.add(
  faFacebook, faInstagram, faLinkedin, faTwitter
);
