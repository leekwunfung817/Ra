SELECT * from (
SELECT avg(REPLACE(REPLACE(名次,'平頭馬',''),' ','')) o,馬名,count(*) c FROM LocalResults GROUP by 馬名 
)
order by o asc;

select * from LocalResults where
馬名='不可擋(E336)';