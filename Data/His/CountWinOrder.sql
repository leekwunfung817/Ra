What is 名次=WV?

SELECT * from (
SELECT avg(REPLACE(REPLACE(名次,'平頭馬',''),' ','')) o,馬名,count(*) c FROM LocalResults GROUP by 馬名 
)
order by o asc;

select 
	avg(REPLACE(REPLACE(名次,'平頭馬',''),' ','')) o
	,* 
from LocalResults where
馬名='何澤堯';

4
select * from LocalResults where 名次 like '% %';