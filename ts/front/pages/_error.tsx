import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import React from 'react';

interface Props extends ErrorProps {}

const MyError: NextPage<Props> = ({ statusCode }) => (
  <div>
    <h1>
      {statusCode}
      {' '}
      에러 발생
    </h1>
  </div>
);

MyError.defaultProps = {
  statusCode: 400,
};

MyError.getInitialProps = async (context) => {
  const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
  return { statusCode };
};

export default MyError;
