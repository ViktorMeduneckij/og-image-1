# OG Image

A simplified version of Vercel's OG image on-demand service.

# Running

This project makes use of the Vercel-CLI.

# Install

You will have to install `vercel` on your machine.

```
npm i -g vercel
```

## Development

- Run `vercel dev`

## URL structure

`/dapp-slug?image=...&uawVale=...`

## Available URL params

```
image,
uawValue,
uawChange,
transactionsValue,
transactionsChange,
volumeValue,
volumeChange,
balanceValue,
balanceChange,
updatedAt,
```

![OG image example](public/og-image-example.png?raw=true "OG image example")
