"use client";

import { Icons, withToggle } from "..";

const Default = withToggle(Icons.CheckedBox, Icons.UncheckedBox);

const All = withToggle(Icons.CheckAll, Icons.UncheckAll);

export { All, Default };
