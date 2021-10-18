# csv_validation_test

Validates data in CVS format and returns an ID that duplicates the email or phone of the current contact. The fields in the file must conform to the following format:
| ID | Full Name | Phone | Email | Age | Experience | Yearly income | Has children | License states | Expiration date | License number | Duplicate with |
| --- | ------------ | ------------ | ----------------- | ----------- | ---------- | ----------------------- | -------------- | -------------- | ------------------------ | -------------- | ------------------------------------------------ |
| 1 | Name Surname | +1хххххххххх | nickname@test.com | integer>=21 | integer<21 | integer/ decimal !>1 mln | (TRUE / FALSE) | AL or Alabama | YYYY-MM-DD or MM/DD/YYYY | 6 characters | There will be an ID with duplicate email / phone |
