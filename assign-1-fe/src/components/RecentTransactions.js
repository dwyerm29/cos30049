export default function RecentTransactions() {
    return (
        <>
      <table class="border-colapse border-separate border-spacing-0 border border-slate-500 table-fixed mt-6">
          <caption class="caption-bottom">
          <a href="null" class="underline underline-offset-1">See all transactions</a>
                </caption>
                <caption class="class-top font-bold text-2xl">
                Latest transactions
                </caption>
            <thead>
                <tr>
                    <th class="border px-6">Name</th>
                    <th class="border px-6">Buy/Sell</th>
                    <th class="border px-6">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border text-left px-1">Cat#0001</td>
                    <td class="border text-left px-1">Buy</td>
                    <td class="border text-left px-1">2.3 ETH</td>
                </tr>
                <tr>
                    <td class="border text-left px-1">MonkI#1003</td>
                    <td class="border text-left px-1">Sell</td>
                    <td class="border text-left px-1">0.136 ETH</td>
                </tr>
                <tr>
                    <td class="border text-left px-1">ManBearPig#0420</td>
                    <td class="border text-left px-1">Buy</td>
                    <td class="border text-left px-1">0.7 ETH</td>
              </tr>
              <tr>
                  <td class="border text-left px-1">Blue#5019</td>
                  <td class="border text-left px-1">Sell</td>
                  <td class="border text-left px-1">1 ETH</td>
              </tr>
              <tr>
                  <td class="border text-left px-1">Computation#1010</td>
                  <td class="border text-left px-1">Buy</td>
                  <td class="border text-left px-1">47 ETH</td>
              </tr>
            </tbody>
            </table>
        </>
  );
}
