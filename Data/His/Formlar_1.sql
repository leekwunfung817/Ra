
with
OrderHorNam AS (
	SELECT avg(o) o,n,count(*) c from 
	(
		SELECT 
			CAST(名次 AS INTEGER) o,
			馬名 n
		FROM LocalResults 
	)
	where o>0
	group by n
	order by o asc
),
OrderRadNam AS (
	SELECT avg(o) o,n,count(*) c from 
	(
		SELECT 
			CAST(名次 AS INTEGER) o,
			騎師 n
		FROM LocalResults 
	)
	where o>0
	group by n
	order by o asc
),
OrderTraNam AS (
	SELECT avg(o) o,n,count(*) c from 
	(
		SELECT 
			CAST(名次 AS INTEGER) o,
			練馬師 n
		FROM LocalResults 
	)
	where o>0
	group by n
	order by o asc
),
RandLast100LocalResults as (
	select * from (
		SELECT dt from LocalResults order by dt desc limit 1000
	)
	order by RANDOM() limit 1
),
RandLast1000Com as (
	select * from LocalResults where dt=(select dt from RandLast100LocalResults)
),
RandPredictHistory as (
	select 
		CAST(a.名次 AS INTEGER) o,a.馬名 h,a.騎師 r,a.練馬師 t,aa.o ho,aa.c hc,bb.o ro,bb.c rc,cc.o tro,cc.c trc
	from 
		RandLast1000Com a,
		OrderHorNam aa,OrderRadNam bb,OrderTraNam cc
	where a.馬名=aa.n and a.騎師=bb.n and a.練馬師=cc.n
	order by CAST(a.名次 AS INTEGER) asc
),
Predicted as (
	select * from RandPredictHistory
)
select (select dt from RandLast100LocalResults) a,(select dt from RandLast100LocalResults) b from RandLast100LocalResults;
