import { CollateralToken } from '../../generated/schema';

export function createCollateralToken(tokenId: string): CollateralToken {
  const collateralToken = new CollateralToken(tokenId);
  collateralToken.token = tokenId;
  collateralToken.save();
  return collateralToken;
}

export function fetchCollateralToken(tokenId: string): CollateralToken {
  let collateralToken = CollateralToken.load(tokenId);
  if (collateralToken === null) {
    collateralToken = createCollateralToken(tokenId);
  }
  return collateralToken;
}
