<?php

namespace drupol\sncbdelay_web\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class Index extends Controller
{
    /**
     * @Route("/web", name="web")
     */
    public function indexAction(Request $request)
    {
        return $this->render('@SNCBDelayWeb/web.html.twig');
    }
}
