<template>
  <v-container>
    <h2>Icon Size Comparison</h2>
    <p>
      Compare icon rendering between <code>npm run dev</code> (port 5173)
      and <code>npm run build && npm run preview</code> (port 4173).
    </p>
    <p>
      In production, icons appear <strong>bigger and bolder</strong> because
      <code>.material-icons { font-size: 24px }</code> overrides
      <code>.v-icon--size-default { font-size: calc(1.5em) }</code>
      due to reversed CSS cascade order.
    </p>

    <v-divider class="my-4" />

    <h3>Icons at different sizes</h3>
    <v-table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Icon</th>
          <th>Expected font-size (relative to parent)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>x-small</td>
          <td><v-icon size="x-small">home</v-icon></td>
          <td><code>1em</code></td>
        </tr>
        <tr>
          <td>small</td>
          <td><v-icon size="small">home</v-icon></td>
          <td><code>1.25em</code></td>
        </tr>
        <tr>
          <td>default</td>
          <td><v-icon>home</v-icon></td>
          <td><code>1.5em</code></td>
        </tr>
        <tr>
          <td>large</td>
          <td><v-icon size="large">home</v-icon></td>
          <td><code>1.75em</code></td>
        </tr>
        <tr>
          <td>x-large</td>
          <td><v-icon size="x-large">home</v-icon></td>
          <td><code>2em</code></td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-4" />

    <h3>Icons inside buttons</h3>
    <v-btn prepend-icon="settings" class="mr-2">Settings</v-btn>
    <v-btn prepend-icon="delete" color="error" class="mr-2">Delete</v-btn>
    <v-btn prepend-icon="check" color="success">Save</v-btn>

    <v-divider class="my-4" />

    <h3>How to verify</h3>
    <p>
      Open DevTools → inspect a <code>&lt;i class="v-icon ... material-icons"&gt;</code>
      element → check which rule wins for <code>font-size</code>:
    </p>
    <ul>
      <li><strong>Dev (correct):</strong> <code>.v-icon--size-default</code> wins → relative <code>1.5em</code></li>
      <li><strong>Prod (bug):</strong> <code>.material-icons</code> wins → fixed <code>24px</code></li>
    </ul>
  </v-container>
</template>
