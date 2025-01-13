"use client";

import { Icons, withToggle } from "..";

const Default = withToggle(
  Icons.Checkbox.CheckedBox,
  Icons.Checkbox.UncheckedBox,
);

const All = withToggle(Icons.Checkbox.CheckAll, Icons.Checkbox.UncheckAll);

export { All, Default };
