-- DropIndex
DROP INDEX "CardReference_card_reversed_idx";

-- CreateIndex
CREATE INDEX "CardReference_userId_card_idx" ON "CardReference"("userId", "card");

-- CreateIndex
CREATE INDEX "CardReference_userId_source_idx" ON "CardReference"("userId", "source");
