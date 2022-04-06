import React, { Component } from "react";
import {
  ListCategories,
  Hasil,
  Menus,
} from "../components/index";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryActive: "Makanan",
      carts: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryActive)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => [console.log(error)]);

    axios
      .get(API_URL + "carts")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => [console.log(error)]);
  }

  componentDidUpdate(prevState) {
    if (this.state.carts !== prevState.carts) {
      axios
        .get(API_URL + "carts")
        .then((res) => {
          const carts = res.data;
          this.setState({ carts });
        })
        .catch((error) => [console.log(error)]);
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryActive: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => [console.log(error)]);
  };

  addTocart = (value) => {
    axios
      .get(API_URL + "carts?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "carts", cart)
            .then((res) => {
              swal({
                title: "Berhasil!",
                text: cart.product.nama + " Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => console.log(error));
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "carts/" + res.data[0].id, cart)
            .then((res) => {
              swal({
                title: "Berhasil!",
                text: cart.product.nama + " Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { menus, categoryActive, carts } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryActive={categoryActive}
              />
              <Col>
                <h4>
                  <strong>Daftar Menu</strong>
                  <hr />
                  <Row>
                    {menus &&
                      menus.map((menu) => (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          addTocart={this.addTocart}
                        />
                      ))}
                  </Row>
                </h4>
              </Col>
              <Hasil carts={carts} {...this.props} />
            </Row>
          </Container>
        </div>

    );
  }
}
