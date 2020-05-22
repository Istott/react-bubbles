import React, { useEffect, useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  const { push } = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/api/colors/:id`, colorToEdit)
      .then(res => {
        console.log('put', res)
        updateColors(colors.map(m => m.id !== id ? m : res.data))
        axiosWithAuth()
          .get(`/api/colors/`)
          .then(res => {
            console.log('get', res)
            updateColors(res.data)
          })
          .catch(err => console.log('second put catch', err))
      })
      .catch(err => console.log('put catch', err));

  };

  // useEffect(() => {
  //   console.log('im triggered')
  //   // setEditing(true)
    
  //   axiosWithAuth()
  //     .get(`/api/colors/`)
  //     .then(res => {
  //       console.log('get', res)
  //       updateColors(res.data)
  //     })
  //     .catch(err => console.log(err))

  // }, [updateColors]);

  const deleteColor = color => {
    // make a delete request to delete this color
    // color.preventDefault();
    console.log('delete got pushed')

    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res.data)
        updateColors(colors.filter(v => `${v.id}` !== res.data))
        // push("/protected");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
