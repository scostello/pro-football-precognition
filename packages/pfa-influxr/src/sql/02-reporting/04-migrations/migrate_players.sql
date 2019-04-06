CREATE OR REPLACE PROCEDURE reporting.migrate_players()
AS $$
BEGIN

  TRUNCATE reporting.players;

  INSERT INTO reporting.players (aa_player_id, first_name, last_name, play_by_play_name, position_1, position_2, height, weight, date_of_birth, forty, bench, vertical, broad, shuttle, cone, arm_length, hand_size, draft_position, college, college_division, first_year, current_team, position_depth_chart, jersey_number, depth_chart, nfl_player_id)
  SELECT
    player_id, first_name, last_name, play_by_play_name, position_1, position_2, height, weight, date_of_birth, forty, bench, vertical, broad, shuttle, cone, arm_length, hand_size, draft_position, college, college_division, first_year, current_team, position_depth_chart, jersey_number, depth_chart, nfl_player_id
  FROM
    armchair_analysis.players;

END;
$$ LANGUAGE plpgsql;