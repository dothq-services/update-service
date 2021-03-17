import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ThemeProvider } from '@material-ui/core'
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
  return (
    <ThemeProvider theme={theme}>
      <SizeWarning />
      <section className={`hero`}>
        <Header uData={uData} isAuth={isAuth}/>
        {children}
        <Footer/>
      </section>
    </ThemeProvider>
  )
}