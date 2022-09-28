# Bond Factory Address

There isn't one anymore.

This came about because we needed to redeploy the BondController after fixing an issue present in the already live version.
This in turn necessitated a redeployment of the BondFactory contract too.

The subgraph was previously configured to track a single BondFactory address, however now we have two we need to track (else we'd lose historic bond history).
The solution is to remove the address from the BondFactory data source, which makes TheGraph handle any events that match the handlers specified for it.
Multiple BondFactory instances can be tracked in this way.

This means there's potential for the subgraph to pick up bonds created by a BondFactory instance deployed by a third party.
This is no cause for concern, as even prior third parties were capable of using our own BondFactory to create bonds that we'd pick up in the subgraph.
Vetting bonds for security reasons has always been a matter of checking the address that created the bond, not the factory it came from.
