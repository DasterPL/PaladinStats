import React from 'react';
import { useParams } from 'react-router';
import './Errors.scss';

import img_notFound from './not-found.png';
import img_forbidden from './forbidden.png';
import img_serverError from './server-error.png';

export default function ErrorPage({ error }) {
  const { code } = useParams();

  const errorCodes = {
    e403: <><img src={img_forbidden} alt="Błąd" /><span>Profil prywatny!"</span></>,
    e404: <><img src={img_notFound} alt="Błąd" /><span>Nie znaleziono!"</span></>,
    e500: <><img src={img_serverError} alt="Błąd" /><span>Błąd serwera!"</span></>,
  }
  const errorString = error ? errorCodes[`e${error}`] : `e${code}` in errorCodes ? errorCodes[`e${code}`] : errorCodes.e404;
  return <div className='errorPage'>
    {errorString}
  </div>
}