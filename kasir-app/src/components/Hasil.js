import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((cartMenus) => (
              <ListGroup.Item key={cartMenus.id}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="dark">
                        {cartMenus.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h6>{cartMenus.product.nama}</h6>
                    <p>Rp.{numberWithCommas(cartMenus.product.harga)}</p>
                  </Col>
                  <Col>
                   <strong className="float-end">Rp.{numberWithCommas(cartMenus.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <TotalBayar carts={carts} {...this.props}/>
      </Col>
    );
  }
}
