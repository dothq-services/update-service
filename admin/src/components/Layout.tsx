import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ThemeProvider, useMediaQuery } from '@material-ui/core'
import { theme } from '../theme'

const SizeWarning = () => {
  return (
    <div className={`size-warning`}>
      <h1>Your screen is too small to use the Dot HQ Update Service!</h1>
      <p>Please either resize your screen, or visit this page on a desktop machine.</p>
    </div>
  )
}

export const Layout = ({
  children,
  uData,
  isAuth
}: {
  children?: any,
  uData?: any,
  isAuth?: any
}) => {

  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <ThemeProvider theme={theme(darkMode)}>
      <SizeWarning />
      <section className={`hero`}>
        <Header uData={uData} isAuth={isAuth}/>
        {children}
        <Footer/>
      </section>
    </ThemeProvider>
  )
}