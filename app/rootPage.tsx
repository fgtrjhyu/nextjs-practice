'use client'

import { useState } from 'react'

const grid =
{ display: "grid"
, gridTemplateColumns: "repeat(2, 1fr)"
, gridAutoRows: "minmax(300px, auto)"
};

const cell =
{ margin: "1em"
, padding: "1em"
, border: "1px solid black"
, color: "blue"
}

function toEntry(value) {
  return (
    { key: crypto.randomUUID()
    , value,
    }
  );
}

function capitalize(value) {
  switch(value.length) {
  case 0: return value;
  case 1: return value.toUpperCase(0);
  default: return value[0].toUpperCase() + value.slice(1).toLowerCase(0);
  }
}

export function TopLeftPage({ children, style, update, model }) {
  const [ favorite, setFavorite ] = useState("");
  const [ description, setDescription ] = useState("");

  function favoriteOnChanged(event) {
    const newFavorite = capitalize(event.target.value.trim());

    const description = model.dictionary[newFavorite] || "";
    setFavorite(newFavorite);
    setDescription(description);
  }

  function descriptionOnChanged(event) {
    const newDescription = event.target.value;
    setDescription(newDescription);
  }

  function puttingFavoriteClicked(event) {
    const newEntry = toEntry([ favorite, description ]);
    update.putFavoriteToBlackHogeFugaPiyoDictionary(favorite, description);
  }

  function removingFavoriteOnClicked(index, favorite) {
    return function(event) {
      update.removeFavoriteFromBlackHogeFugaPiyoDictionary(favorite);
    }
  }

  function choosingFavoriteOnClicked(index, favorite) {
    return function(event) {
      setFavorite(favorite);
      setDescription(model.dictionary[favorite]);
    }
  }

  const entries = Object.entries(model.dictionary).map(toEntry);

  const disabled = (favorite.length === 0) || (description.length === 0);

  function showFavorite({ key: key, value: [ favorite, description ] }, index) {
    return (
      <div key={key}>
        <details>
          <summary>
            {favorite}
          </summary>
          {description}
        </details>
        <div style={ { textAlign: "right" } }>
          <button onClick={choosingFavoriteOnClicked(index, favorite)}>choose</button>
          <button onClick={removingFavoriteOnClicked(index, favorite)}>remove</button>
        </div>
      </div>
    );
  }

  return (
    <div style={style}>
      { children }
      <hr/>
      { entries.map(showFavorite) }
      <hr/>
      <div>
        <div>
          <label>Favorite</label>
        </div>
        <div>
          <input value={favorite} onChange={favoriteOnChanged}/>
        </div>
        <div>
          <label>description</label>
        </div>
        <div>
          <textarea value={description} onChange={descriptionOnChanged}/>
        </div>
        <div style={ { textAlign: "right" } }>
          <button onClick={puttingFavoriteClicked} disabled={disabled}>put</button>
        </div>
      </div>
    </div>
  );
}

export function TopRightPage({ children, style, update, model }) {

  const [ name, setName ] = useState("");

  function nameOnChanged(event) {
    const newName = capitalize(event.target.value);
    setName(newName);
  }

  function addingPersonOnClicked() {
    update.addPersonToRedFooBarBazQuxPeople(name);
  }

  function removingPersonOnClicked(name) {
    return function() {
      update.removePersonFromRedFooBarBazQuxPeople(name);
    }
  }

  function showPerson(entry, index) {
    return (
      <li key={entry.key}>
        <span>{ entry.value.name }</span>
        <div style={ { textAlign: "right" } }>
          <button onClick={removingPersonOnClicked(entry.value.name)}>remove</button>
        </div>
      </li>
    );
  }

  const [ person ] = model.people.filter(e => e.name === name);

  const entries = model.people.map(toEntry);
  return (
    <div style={style}>
      { children }
      <hr/>
      <ol>
      { entries.map(showPerson) }
      </ol>
      <div>
        <label>name:
          <input value={name} onChange={nameOnChanged}/>
        </label>

        <button disabled={name.length == 0 || person} onClick={addingPersonOnClicked}>add</button>
      </div>
    </div>
  ); }

export function BottomLeftPage({ children, style, update, model }) {

  function personOnClicked(person, index) {
    return function() {
      update.setNameToRedFooBarBazQuxName(person);
    }
  }

  function showPerson(person) {
    return function(entry, index) {
      const style = (entry.value == person) ? { color: "white", backgroundColor: "blue" } : {};
      return (
        <div key={entry.key} style={style} onClick={personOnClicked(entry.value, index)}>{ entry.value.name }</div>
      );
    }
  }

  function toggleOnClicked(existent, person, entry, index) {
    return function(event) {
      if (existent) {
        update.removeFavoriteFromRedFooBarBazQuxPeoplePersonFavorites(entry.value, person);
      } else {
        update.addFavoriteToRedFooBarBazQuxPeoplePersonFavorites(entry.value, person);
      }
    }
  }


  function showFavorite(person) {
    return function(entry, index) {
      const existent = person.favorites.indexOf(entry.value) >= 0;
      const style = existent ? { color: "white", backgroundColor: "blue" } : {};
      return (
        <div key={entry.key} style={style} onClick={toggleOnClicked(existent, person, entry, index)}>{entry.value}</div>
      );
    }
  }

  const header =
  { backgroundColor: "gray"
  , color: "white"
  , fontWeith: "bold"
  , fontSize: "larger"
  , padding: "8px"
  };

  const entries = model.people.map(toEntry);
  const favorites = Object.keys(model.dictionary).map(toEntry);
  const [ person ] = model.people.filter(e => e.name === model.name).concat(model.people);
  if (person) {
    return (
      <div style={style}>
        { children }
        <hr/>
        <div style={ { display: "grid", gridTemplateColumns: "1fr 5fr" } }>
          <div>
            <div style={header}>Person</div>
            { entries.map(showPerson(person)) }
          </div>
          <div>
            <div style={header}>Favorites</div>
            { favorites.map(showFavorite(person)) }
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={style}>
        { children }
        <hr/>
        <h1>People are empty.</h1>
      </div>
    );
  }
}

export function BottomRightPage({ children, style, update, model }) {
  return (
    <div style={style}>
      { children }
    </div>
  );
}

function toTopLeft(root) {
  const dictionary = root.black.hoge.fuga.piyo.dictionary;
  return { dictionary };
}

function toTopRight(root) {
  const people = root.red.foo.bar.baz.qux.people;
  return { people };
}

function toBottomLeft(root) {
  const name = root.red.foo.bar.baz.qux.name;
  const people = root.red.foo.bar.baz.qux.people;
  const dictionary = root.black.hoge.fuga.piyo.dictionary;
  return { people, dictionary, name };
}

function toBottomRight(root) {
  return root;
}

export function RootPage({ children, model }) {
  const [ root, setRoot ] = useState(model);

  const update =
  { updateRoot(root, newRoot)
    { return newRoot
    }
  , updateRootRed(root, red)
    { return this.updateRoot(root, { ...root, red });
    }
  , updateRootRedFoo(root, foo)
    { return this.updateRootRed(root, { ...root.red, foo });
    }
  , updateRootRedFooBar(root, bar)
    { return this.updateRootRedFoo(root, { ...root.red.foo, bar });
    }
  , updateRootRedFooBarBaz(root, baz)
    { return this.updateRootRedFooBar(root, { ...root.red.foo.bar, baz });
    }
  , updateRootRedFooBarBazQux(root, qux)
    { return this.updateRootRedFooBarBaz(root, { ...root.red.foo.bar.baz, qux });
    }
  , updateRootBlack(root, black)
    { return this.updateRoot(root, { ...root, black });
    }
  , updateRootBlackHoge(root, hoge)
    { return this.updateRootBlack(root, { ...root.black, hoge });
    }
  , updateRootBlackHogeFuga(root, fuga)
    { return this.updateRootBlackHoge(root, { ...root.black.hoge, fuga });
    }
  , updateRootBlackHogeFugaPiyo(root, piyo)
    { return this.updateRootBlackHogeFuga(root, { ...root.black.hoge.fuga, piyo });
    }
  , putFavoriteToBlackHogeFugaPiyoDictionary(favorite, description) {
      const piyo = root.black.hoge.fuga.piyo;
      const dictionary = Object.fromEntries(
        Object.entries(piyo.dictionary).concat( [ [ favorite, description ] ] )
      );
      const newRoot = this.updateRootBlackHogeFugaPiyo(root, { ...piyo, dictionary });
      setRoot(newRoot);
    }
  , removeFavoriteFromBlackHogeFugaPiyoDictionary(favorite) {
      const piyo = root.black.hoge.fuga.piyo;
      const dictionary = Object.fromEntries(
        Object.entries(piyo.dictionary).filter( ([k, v], index) => k !== favorite)
      );
      const newRoot = this.updateRootBlackHogeFugaPiyo(root, { ...piyo, dictionary });
      setRoot(newRoot);
    }
  , addPersonToRedFooBarBazQuxPeople(name) {
      const qux = root.red.foo.bar.baz.qux;
      const people =  qux.people.concat( [ { name: name, favorites: [] } ] );
      const newRoot = this.updateRootRedFooBarBazQux(root, { ...qux, people });
      setRoot(newRoot);
    }
  , removePersonFromRedFooBarBazQuxPeople(name) {
      const qux = root.red.foo.bar.baz.qux;
      const people =  qux.people.filter(e => e.name != name);
      const newRoot = this.updateRootRedFooBarBazQux(root, { ...qux, people });
      setRoot(newRoot);
    }
  , setNameToRedFooBarBazQuxName(person) {
      const qux = root.red.foo.bar.baz.qux;
      const newRoot = this.updateRootRedFooBarBazQux(root, { ...qux, name: person.name });
      setRoot(newRoot);
    }
  , addFavoriteToRedFooBarBazQuxPeoplePersonFavorites(favorite, person) {
      const qux = root.red.foo.bar.baz.qux;
      const newPerson = { ...person, favorites: person.favorites.concat( [ favorite ] ) };
      const people = qux.people.map( e => e.name === newPerson.name ? newPerson : e )
      const newRoot = this.updateRootRedFooBarBazQux(root, { ...qux, name: person.name, people });
      setRoot(newRoot);
    }
  , removeFavoriteFromRedFooBarBazQuxPeoplePersonFavorites(favorite, person) {
      const qux = root.red.foo.bar.baz.qux;
      const newPerson = { ...person, favorites: person.favorites.filter( e => e != favorite ) };
      const people = qux.people.map( e => e.name === newPerson.name ? newPerson : e );
      const newRoot = this.updateRootRedFooBarBazQux(root, { ...qux, name: person.name, people });
      setRoot(newRoot);
    }
  };

  const modelTopLeft = toEntry(toTopLeft(root));
  const pageTopLeft = (
    <TopLeftPage key={modelTopLeft.key} style={cell} update={update} model={modelTopLeft.value}>Top Left</TopLeftPage>
  );

  const modelTopRight = toEntry(toTopRight(root));
  const pageTopRight = (
    <TopRightPage key={modelTopRight.key} style={cell} update={update} model={modelTopRight.value}>Top Right</TopRightPage>
  );

  const modelBottomLeft = toEntry(toBottomLeft(root));
  const pageBottomLeft = (
    <BottomLeftPage key={modelBottomLeft.key} style={cell} update={update} model={modelBottomLeft.value}>Bottom Left</BottomLeftPage>
  );

  const modelBottomRight = toEntry(toBottomRight(root));
  const pageBottomRight = (
    <BottomRightPage key={modelBottomRight.key} style={cell} update={update} model={modelBottomRight.value}>Bottom Right</BottomRightPage>
  );

  return (
    <>
      { children }
      <hr/>
      <div style={grid}>
        { pageTopLeft }
        { pageTopRight }
        { pageBottomLeft }
        { pageBottomRight }
      </div>
    </>
  );
}
