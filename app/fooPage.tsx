'use client'

export function Foo({ children, left, right }) {

  const gridStyle =
  { display: "grid"
  , gridTemplateColumns: "1fr 1fr"
  , gridAutoRows: "minmax(300px, auto)"
  };

  const gridCellStyle = 
  { border: "1px solid black"
  , padding: "3px 1px 3px 2px"
  , margin: "2px 1px 2px 2px"
  };

  return (
    <div>
      <div>{ children }</div>
      <div style={gridStyle}>
        <div style={gridCellStyle}>{ left }</div>
        <div style={gridCellStyle}>{ right }</div>
      </div>
    </div>
  );
}
