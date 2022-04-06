import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constans";

export default class TotalBayar extends Component {
    submitTotalBayar = (TotalBayar) => {
        const order = {
            total_bayar: TotalBayar,
            menus: this.props.carts
        }

        axios.post(API_URL+"orders", order).then((res) => {
            this.props.history.push('/sukses')
        })
    }
  render() {
    const TotalBayar = this.props.carts.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-end mr-2">
                Rp. {numberWithCommas(TotalBayar)}
              </strong>
            </h4>
            <div className="d-grid gap-2">
              <Button
                variant="dark"
                className="m-2"
                size="lg"
                onClick={() => this.submitTotalBayar(TotalBayar)}
              >
               <FontAwesomeIcon icon={faShoppingCart}/> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
