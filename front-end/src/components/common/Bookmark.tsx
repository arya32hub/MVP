"use client";

import { Icons } from "..";
import { withToggle } from "../hoc";

const Bookmark = withToggle(Icons.Bookmark.Checked, Icons.Bookmark.Unchecked);

export { Bookmark };
