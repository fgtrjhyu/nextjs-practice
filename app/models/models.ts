export class Branch {
  value: number;
  left: Branch;
  right: Branch;
  constructor(
    { value
    , left
    , right
    }
  : { value: number
    , left: Branch
    , right: Branch
    }
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
};
