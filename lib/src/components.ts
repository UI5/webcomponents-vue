/**
 * Pre-built Vue component wrappers for common UI5 Web Components.
 *
 * These components are ready to use without manual wrapping.
 * Import them directly in your Vue components:
 *
 * ```ts
 * import { Ui5Input, Ui5Button, Ui5Dialog } from '@ui5/webcomponents-vue/components';
 * ```
 *
 * @module components
 * @author SAP SE
 * @license Apache-2.0
 */

import createComponent from './createComponent.js';

// Import UI5 Web Components
import Avatar from '@ui5/webcomponents/dist/Avatar.js';
import Tag from '@ui5/webcomponents/dist/Tag.js';
import Bar from '@ui5/webcomponents/dist/Bar.js';
import Button from '@ui5/webcomponents/dist/Button.js';
import Card from '@ui5/webcomponents/dist/Card.js';
import CardHeader from '@ui5/webcomponents/dist/CardHeader.js';
import CheckBox from '@ui5/webcomponents/dist/CheckBox.js';
import ComboBox from '@ui5/webcomponents/dist/ComboBox.js';
import DatePicker from '@ui5/webcomponents/dist/DatePicker.js';
import Dialog from '@ui5/webcomponents/dist/Dialog.js';
import Icon from '@ui5/webcomponents/dist/Icon.js';
import Input from '@ui5/webcomponents/dist/Input.js';
import Label from '@ui5/webcomponents/dist/Label.js';
import Link from '@ui5/webcomponents/dist/Link.js';
import List from '@ui5/webcomponents/dist/List.js';
import ListItemStandard from '@ui5/webcomponents/dist/ListItemStandard.js';
import Menu from '@ui5/webcomponents/dist/Menu.js';
import MenuItem from '@ui5/webcomponents/dist/MenuItem.js';
import MessageStrip from '@ui5/webcomponents/dist/MessageStrip.js';
import MultiComboBox from '@ui5/webcomponents/dist/MultiComboBox.js';
import Panel from '@ui5/webcomponents/dist/Panel.js';
import Popover from '@ui5/webcomponents/dist/Popover.js';
import ProgressIndicator from '@ui5/webcomponents/dist/ProgressIndicator.js';
import RadioButton from '@ui5/webcomponents/dist/RadioButton.js';
import RatingIndicator from '@ui5/webcomponents/dist/RatingIndicator.js';
import Select from '@ui5/webcomponents/dist/Select.js';
import Slider from '@ui5/webcomponents/dist/Slider.js';
import Switch from '@ui5/webcomponents/dist/Switch.js';
import Tab from '@ui5/webcomponents/dist/Tab.js';
import TabContainer from '@ui5/webcomponents/dist/TabContainer.js';
import Table from '@ui5/webcomponents/dist/Table.js';
import TableHeaderCell from '@ui5/webcomponents/dist/TableHeaderCell.js';
import TableHeaderRow from '@ui5/webcomponents/dist/TableHeaderRow.js';
import TableCell from '@ui5/webcomponents/dist/TableCell.js';
import TableRow from '@ui5/webcomponents/dist/TableRow.js';
import TextArea from '@ui5/webcomponents/dist/TextArea.js';
import TimePicker from '@ui5/webcomponents/dist/TimePicker.js';
import Title from '@ui5/webcomponents/dist/Title.js';
import Toast from '@ui5/webcomponents/dist/Toast.js';
import ToggleButton from '@ui5/webcomponents/dist/ToggleButton.js';
import Tree from '@ui5/webcomponents/dist/Tree.js';
import TreeItem from '@ui5/webcomponents/dist/TreeItem.js';

/**
 * Avatar component wrapper with default v-model support.
 * @see https://sap.github.io/ui5-webcomponents/components/Avatar/
 */
export const Ui5Avatar = /* @__PURE__ */ createComponent(Avatar);

/**
 * Tag component wrapper (formerly Badge).
 * @see https://sap.github.io/ui5-webcomponents/components/Tag/
 */
export const Ui5Tag = /* @__PURE__ */ createComponent(Tag);

/**
 * Bar component wrapper for header/footer bars.
 * @see https://sap.github.io/ui5-webcomponents/components/Bar/
 */
export const Ui5Bar = /* @__PURE__ */ createComponent(Bar);

/**
 * Button component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Button/
 */
export const Ui5Button = /* @__PURE__ */ createComponent(Button);

/**
 * Card component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Card/
 */
export const Ui5Card = /* @__PURE__ */ createComponent(Card);

/**
 * CardHeader component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/CardHeader/
 */
export const Ui5CardHeader = /* @__PURE__ */ createComponent(CardHeader);

/**
 * CheckBox component wrapper with v-model support for checked state.
 * v-model binds to "checked" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/CheckBox/
 */
export const Ui5CheckBox = /* @__PURE__ */ createComponent(CheckBox, { prop: 'checked', event: 'change' });

/**
 * ComboBox component wrapper with default v-model support.
 * @see https://sap.github.io/ui5-webcomponents/components/ComboBox/
 */
export const Ui5ComboBox = /* @__PURE__ */ createComponent(ComboBox);

/**
 * DatePicker component wrapper with v-model support.
 * v-model binds to "value" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/DatePicker/
 */
export const Ui5DatePicker = /* @__PURE__ */ createComponent(DatePicker, { prop: 'value', event: 'change' });

/**
 * Dialog component wrapper with v-model support for open state.
 * v-model binds to "open" property and "close" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Dialog/
 */
export const Ui5Dialog = /* @__PURE__ */ createComponent(Dialog, { prop: 'open', event: 'close' });

/**
 * Icon component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Icon/
 */
export const Ui5Icon = /* @__PURE__ */ createComponent(Icon);

/**
 * Input component wrapper with default v-model support.
 * v-model binds to "value" property and "input" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Input/
 */
export const Ui5Input: ReturnType<typeof createComponent> = /* @__PURE__ */ createComponent(Input);

/**
 * Label component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Label/
 */
export const Ui5Label = /* @__PURE__ */ createComponent(Label);

/**
 * Link component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Link/
 */
export const Ui5Link = /* @__PURE__ */ createComponent(Link);

/**
 * List component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/List/
 */
export const Ui5List = /* @__PURE__ */ createComponent(List);

/**
 * ListItemStandard component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/ListItemStandard/
 */
export const Ui5ListItemStandard = /* @__PURE__ */ createComponent(ListItemStandard);

/**
 * Menu component wrapper with v-model support for open state.
 * v-model binds to "open" property and "close" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Menu/
 */
export const Ui5Menu = /* @__PURE__ */ createComponent(Menu, { prop: 'open', event: 'close' });

/**
 * MenuItem component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/MenuItem/
 */
export const Ui5MenuItem = /* @__PURE__ */ createComponent(MenuItem);

/**
 * MessageStrip component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/MessageStrip/
 */
export const Ui5MessageStrip: ReturnType<typeof createComponent> = /* @__PURE__ */ createComponent(MessageStrip);

/**
 * MultiComboBox component wrapper with default v-model support.
 * @see https://sap.github.io/ui5-webcomponents/components/MultiComboBox/
 */
export const Ui5MultiComboBox = /* @__PURE__ */ createComponent(MultiComboBox);

/**
 * Panel component wrapper with v-model support for collapsed state.
 * v-model binds to "collapsed" property and "toggle" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Panel/
 */
export const Ui5Panel = /* @__PURE__ */ createComponent(Panel, { prop: 'collapsed', event: 'toggle' });

/**
 * Popover component wrapper with v-model support for open state.
 * v-model binds to "open" property and "close" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Popover/
 */
export const Ui5Popover: ReturnType<typeof createComponent> = /* @__PURE__ */ createComponent(Popover, { prop: 'open', event: 'close' });

/**
 * ProgressIndicator component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/ProgressIndicator/
 */
export const Ui5ProgressIndicator = /* @__PURE__ */ createComponent(ProgressIndicator);

/**
 * RadioButton component wrapper with v-model support for checked state.
 * v-model binds to "checked" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/RadioButton/
 */
export const Ui5RadioButton = /* @__PURE__ */ createComponent(RadioButton, { prop: 'checked', event: 'change' });

/**
 * RatingIndicator component wrapper with v-model support.
 * v-model binds to "value" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/RatingIndicator/
 */
export const Ui5RatingIndicator = /* @__PURE__ */ createComponent(RatingIndicator, { prop: 'value', event: 'change' });

/**
 * Select component wrapper with v-model support.
 * v-model binds to "value" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Select/
 */
export const Ui5Select = /* @__PURE__ */ createComponent(Select, { prop: 'value', event: 'change' });

/**
 * Slider component wrapper with v-model support.
 * v-model binds to "value" property and "input" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Slider/
 */
export const Ui5Slider = /* @__PURE__ */ createComponent(Slider);

/**
 * Switch component wrapper with v-model support for checked state.
 * v-model binds to "checked" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/Switch/
 */
export const Ui5Switch = /* @__PURE__ */ createComponent(Switch, { prop: 'checked', event: 'change' });

/**
 * Tab component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Tab/
 */
export const Ui5Tab = /* @__PURE__ */ createComponent(Tab);

/**
 * TabContainer component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TabContainer/
 */
export const Ui5TabContainer = /* @__PURE__ */ createComponent(TabContainer);

/**
 * Table component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Table/
 */
export const Ui5Table = /* @__PURE__ */ createComponent(Table);

/**
 * TableHeaderCell component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TableHeaderCell/
 */
export const Ui5TableHeaderCell = /* @__PURE__ */ createComponent(TableHeaderCell);

/**
 * TableHeaderRow component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TableHeaderRow/
 */
export const Ui5TableHeaderRow = /* @__PURE__ */ createComponent(TableHeaderRow);

/**
 * TableCell component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TableCell/
 */
export const Ui5TableCell = /* @__PURE__ */ createComponent(TableCell);

/**
 * TableRow component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TableRow/
 */
export const Ui5TableRow = /* @__PURE__ */ createComponent(TableRow);

/**
 * TextArea component wrapper with default v-model support.
 * v-model binds to "value" property and "input" event.
 * @see https://sap.github.io/ui5-webcomponents/components/TextArea/
 */
export const Ui5TextArea = /* @__PURE__ */ createComponent(TextArea);

/**
 * TimePicker component wrapper with v-model support.
 * v-model binds to "value" property and "change" event.
 * @see https://sap.github.io/ui5-webcomponents/components/TimePicker/
 */
export const Ui5TimePicker = /* @__PURE__ */ createComponent(TimePicker, { prop: 'value', event: 'change' });

/**
 * Title component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Title/
 */
export const Ui5Title = /* @__PURE__ */ createComponent(Title);

/**
 * Toast component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Toast/
 */
export const Ui5Toast = /* @__PURE__ */ createComponent(Toast);

/**
 * ToggleButton component wrapper with v-model support for pressed state.
 * v-model binds to "pressed" property and "click" event.
 * @see https://sap.github.io/ui5-webcomponents/components/ToggleButton/
 */
export const Ui5ToggleButton = /* @__PURE__ */ createComponent(ToggleButton, { prop: 'pressed', event: 'click' });

/**
 * Tree component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/Tree/
 */
export const Ui5Tree = /* @__PURE__ */ createComponent(Tree);

/**
 * TreeItem component wrapper.
 * @see https://sap.github.io/ui5-webcomponents/components/TreeItem/
 */
export const Ui5TreeItem = /* @__PURE__ */ createComponent(TreeItem);
