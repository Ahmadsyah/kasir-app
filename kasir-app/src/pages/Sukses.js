import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constans";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "carts")
      .then((res) => {
        const carts = res.data;
        carts.map(function(item){
          return axios
          .delete(API_URL+"carts/"+item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
        })
      })
      .catch((error) => [console.log(error)]);
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width="300" />
        <h2>Sukses Pesan</h2>
        <p>Terima Kasih Sudah Mesesan</p>
        <Button variant="dark" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
