'use client';
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    //<Container className="d-flex justify-content-center align-items-center vh-100">
    //  <Row>
    //    <Col>
    //      <div className="card p-4" style={{ width: '400px' }}>
    //        <h2 className="text-center mb-4">Forgot Password</h2>
    //        <p className="text-center text-muted mb-4">
    //          Enter your email address to receive a password reset link.
    //        </p>
    //        <Form>
    //          <Form.Group className="mb-3" controlId="formBasicEmail">
    //            <Form.Label>Email address</Form.Label>
    //            <Form.Control type="email" placeholder="Enter your email" />
    //          </Form.Group>

    //          <Button variant="primary" type="submit" className="w-100">
    //            Send Reset Link
    //          </Button>
    //        </Form>
    //        <div className="text-center mt-3">
    //          <Link href="/login">Back to Login</Link>
    //        </div>
    //      </div>
    //    </Col>
    //  </Row>
    //</Container>
 <section className="section-gap">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="d-flex justify-content-center align-items-center">
          <div className="card shadow-sm p-4 w-100">
            <h4 className="text-center mb-1 fw-bold">Forgot Password</h4>
            <p className="text-center small text-muted mb-4">
              Enter your email address and we’ll send you a link to reset your password.
            </p>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-block-16">
                Email
              </label>
              <input
                type="email"
                className="form-control shadow-none text-block-16"
                id="email"
                placeholder="example@gmail.com"
              />
            </div>

            <button className="btn primary-bg custom-btn-style w-100 border-0">
              Send Reset Link
            </button>

            <p className="text-center small mb-0 mt-3">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-decoration-none primary-color"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default ForgotPassword;
