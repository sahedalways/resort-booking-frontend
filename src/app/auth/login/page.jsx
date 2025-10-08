"use client";

import Link from "next/link";
import Image from "next/image";
import Toast from "@/src/components/Toast";
import { AuthContext } from "../../hooks/api/AuthContext";
import { useContext } from "react";

const LoginPage = () => {
  const { isLogoutMessage, setLogoutMessage } = useContext(AuthContext);

  return (
    <section className="section-gap">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="d-flex justify-content-center align-items-center">
              <div className="card shadow-sm p-4 w-100">
                <h4 className="text-center mb-1 fw-bold">Please Sign in</h4>
                <p className="text-center text-muted small mb-4">
                  You need to Sign in first to continue
                </p>

                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-light border w-50 d-flex align-items-center justify-content-center">
                    <Image
                      width={16}
                      height={16}
                      src="/img/google-logo.png"
                      alt="Google"
                      className="me-2"
                    />
                    Google
                  </button>
                  <button className="btn btn-light border w-50 d-flex align-items-center justify-content-center">
                    <Image
                      width={16}
                      height={16}
                      src="/img/facebook-new.png"
                      alt="Facebook"
                      className="me-2"
                    />
                    Facebook
                  </button>
                </div>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted small">Or Sign In with</span>
                  <hr className="flex-grow-1" />
                </div>

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

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="form-label text-block-16"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control shadow-none text-block-16"
                    id="password"
                    placeholder="Your Password"
                  />
                </div>
                <div className="mb-3 text-end">
                  <Link
                    href="/forget-password"
                    className="small text-decoration-none primary-color"
                  >
                    Forget Password?
                  </Link>
                </div>

                <button className="btn primary-bg custom-btn-style w-100 border-0">
                  Sign In
                </button>

                <p className="text-center small mb-0 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-decoration-none primary-color"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast
        message={isLogoutMessage}
        type="error"
        onClose={() => setLogoutMessage("")}
      />
    </section>
  );
};

export default LoginPage;
