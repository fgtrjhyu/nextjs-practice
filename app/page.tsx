import { RootPage, FooPage } from "./rootPage"

export default function Home() {

  const root =
  { red:
    { foo:
      { bar:
        { baz: 
          { qux:
            { people: 
              [ { name: "Alice"
                , favorites: [ "Extra Strong Mints" ]
                }
              , { name: "Bob"
                , favorites: [ "Apple", "Blueberry" ]
                }
              , { name: "Carol"
                , favorites: [ "Extra Strong Mints", "Apple", "Chocolate" ]
                }
              ]
            }
          }
        }
      }
    }
  , black:
    { hoge:
      { fuga:
        { piyo:
          { dictionary:
            { "Apple"
            : "Apple is a fruit."
            , "Blueberry"
            : "Blueberry in a fruit."
            , "Chocolate"
            : "Chocolate is made from Cacao "
            , "Daily Milk"
            : "Daily Milk is a well-known chocolate bar"
            , "Extra Strong Mints"
            : "Extra Strong Mints is a brand name of mints produced in the United Kingdom"
            }
          }
        }
      }
    }
  };

  return (
    <RootPage model={root}>
      <h4>something</h4>
    </RootPage>
  );
}
