"use client"
import React from "react"
import Link from "next/link"
import Breadcrumbs from "@marketsystems/nextjs13-appdir-breadcrumbs";
import "../styles/bread-crumb.css"

export function BreadCrumb() {

  return (
    <Breadcrumbs
      omitRootLabel
      useDefaultStyle
      containerClassName="breadcrumb" 
      transformLabel={(title: string) => title}
    />
  )
}
