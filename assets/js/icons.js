import { config, dom, library } from "@fortawesome/fontawesome-svg-core";
config.keepOriginalSource = false;

import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faDog } from "@fortawesome/free-solid-svg-icons/faDog";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons/faEnvelopeSquare";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons/faFirstAid";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons/faLevelDownAlt";
import { faRssSquare } from "@fortawesome/free-solid-svg-icons/faRssSquare";
import { faRunning } from "@fortawesome/free-solid-svg-icons/faRunning";

library.add(
  faBolt,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faDog,
  faEnvelopeSquare,
  faEye,
  faFirstAid,
  faLevelDownAlt,
  faRssSquare,
  faRunning
);

dom.watch();
