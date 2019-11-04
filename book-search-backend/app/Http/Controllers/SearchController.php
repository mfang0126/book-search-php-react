<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use League\Csv\Exception;
    use League\Csv\Reader;
    use League\Csv\Statement;

    class SearchController extends Controller
    {
        public function search(Request $request)
        {
            $query = $request->get('query');
            try {
                $path   = storage_path() . "/books.csv";
                $stream = fopen($path, 'r');
                $csv    = Reader::createFromStream($stream);
                $csv->setDelimiter(',');
                $csv->setHeaderOffset(0);
                $records = (new Statement())->where(function (array $record) use ($query) : bool {
                    similar_text($record['original_title'], $query, $percent);
                    return $percent > 60;
                })->limit(10)->process($csv);
                return response()->json(['status' => 1, 'data' => $records]);
            } catch (Exception $e) {
                return response()->json(['status' => 0, 'error' =>$e ]);
            }
        }
    }
